import { create } from "zustand";

// 8 scenes for the Part3B-1 Cinematic Story
export type SceneType = "scene01" | "scene02" | "scene03" | "scene04" | "scene05" | "scene06" | "scene07" | "scene08";

export interface StudySuggestion {
  id: string;
  title: string;
  currentFrictionSlot: string;
  suggestedSlot: string;
  subject: string;
  rationale: string;
  status: "pending" | "accepted" | "edited" | "dismissed";
  statistics: {
    completionRate: string;
    distractionDrop: string;
    quizAccuracy: string;
    sampleSessions: number;
    repeatedApp: string;
    attemptCount: number;
  };
  customTime?: {
    startTime: string;
    endTime: string;
    subject: string;
  };
}

export interface ParentAccessRequest {
  id: string;
  studentName: string;
  appName: string;
  appIcon: "instagram" | "youtube" | "shorts" | "snapchat";
  requestedMinutes: number;
  reason: string;
  timestamp: string;
  status: "pending" | "approved" | "rejected";
  rejectNote?: string;
}

export interface ActiveTimeGrant {
  id: string;
  appName: string;
  appIcon: "instagram" | "youtube" | "shorts" | "snapchat";
  durationMinutes: number;
  remainingSeconds: number;
  grantedAt: string;
  expiresAt: string;
  status: "active" | "expired";
}

export interface InAppToastNotification {
  id: string;
  title: string;
  message: string;
  type: "parent_request" | "grant_approved" | "grant_rejected" | "grant_expired" | "schedule_updated";
  targetScreen?: "parent" | "intercept" | "study" | "dashboard";
  timestamp: string;
}

interface ScheduleBlock {
  id: string;
  timeSlot: string;
  subject: string;
  status: "active" | "upcoming" | "optimized";
}

interface StoreState {
  currentScene: SceneType;
  setCurrentScene: (scene: SceneType) => void;
  phoneRef: React.RefObject<HTMLDivElement | null> | null;
  cameraRigRef: React.RefObject<HTMLDivElement | null> | null;
  aiCoreRef: React.RefObject<HTMLDivElement | null> | null;
  setPhoneRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
  setCameraRigRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
  setAiCoreRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
  
  // OTA Update State
  isOtaModalOpen: boolean;
  setOtaModalOpen: (open: boolean) => void;
  otaChannel: "stable" | "canary";
  setOtaChannel: (channel: "stable" | "canary") => void;
  otaDownloadProgress: number;
  setOtaDownloadProgress: (progress: number) => void;
  isOtaDownloading: boolean;
  setIsOtaDownloading: (downloading: boolean) => void;
  hasOtaNotification: boolean;
  setHasOtaNotification: (has: boolean) => void;
  otaVersion: string;
  dismissOtaNotification: () => void;
  triggerOtaNotification: () => void;

  // Feature 1: Adaptive Study Schedule & Friction Discovery
  studySuggestions: StudySuggestion[];
  activeSchedule: ScheduleBlock[];
  acceptStudySuggestion: (id: string) => void;
  editStudySuggestion: (id: string, startTime: string, endTime: string, subject: string) => void;
  dismissStudySuggestion: (id: string) => void;
  resetStudySuggestions: () => void;

  // Feature 2: Parent Quick Approval & Time-Limited Grants
  parentRequests: ParentAccessRequest[];
  activeGrants: ActiveTimeGrant[];
  inAppNotification: InAppToastNotification | null;
  requestParentAccess: (appName: string, appIcon: "instagram" | "youtube" | "shorts" | "snapchat", minutes: number, reason: string) => void;
  approveParentRequest: (requestId: string, grantMinutes?: number) => void;
  rejectParentRequest: (requestId: string, rejectNote?: string) => void;
  revokeGrant: (grantId: string) => void;
  tickGrants: () => void;
  dismissInAppToast: () => void;
}

const INITIAL_SUGGESTIONS: StudySuggestion[] = [
  {
    id: "sug-1",
    title: "Shift Physics Block to High-Energy Morning Window",
    currentFrictionSlot: "3:00 PM – 4:30 PM (Afternoon Slump)",
    suggestedSlot: "07:00 AM – 08:30 AM (Peak Retention)",
    subject: "Physics (Light: Reflection & Refraction)",
    rationale: "Repeated Instagram and YouTube launches detected during 3:00 PM study period. Historical logs show 94% focus completion in early mornings with 0 distraction attempts.",
    status: "pending",
    statistics: {
      completionRate: "94% vs 42%",
      distractionDrop: "-88% app opens",
      quizAccuracy: "+28% higher score",
      sampleSessions: 14,
      repeatedApp: "Instagram",
      attemptCount: 18,
    }
  },
  {
    id: "sug-2",
    title: "Insert 15-Minute Cognitive Breather",
    currentFrictionSlot: "5:00 PM – 7:00 PM (Unbroken Block)",
    suggestedSlot: "5:00 PM – 5:50 PM + 15m Breather + 6:05 PM – 7:00 PM",
    subject: "Mathematics (Quadratic Equations)",
    rationale: "Friction peaks around 5:45 PM with 12 attempted YouTube Shorts launches. A scheduled 15m breather prevents willpower depletion and maintains 86% quiz accuracy.",
    status: "pending",
    statistics: {
      completionRate: "89% vs 51%",
      distractionDrop: "-75% impulsivity",
      quizAccuracy: "+19% retention",
      sampleSessions: 11,
      repeatedApp: "YouTube Shorts",
      attemptCount: 12,
    }
  },
  {
    id: "sug-3",
    title: "Optimize Chemistry PYQ Session to Early Evening",
    currentFrictionSlot: "9:30 PM – 11:00 PM (Late Night)",
    suggestedSlot: "6:30 PM – 8:00 PM (Optimal Circadian Window)",
    subject: "Chemistry (Chemical Reactions & Equations)",
    rationale: "Late night sessions show 3.4x higher app switching friction. Early evening slot historically yields 32m average uninterrupted focus stretches.",
    status: "pending",
    statistics: {
      completionRate: "91% vs 38%",
      distractionDrop: "-92% late relapse",
      quizAccuracy: "+24% problem solve rate",
      sampleSessions: 9,
      repeatedApp: "Snapchat",
      attemptCount: 15,
    }
  }
];

const INITIAL_SCHEDULE: ScheduleBlock[] = [
  { id: "sch-1", timeSlot: "07:00 AM – 08:30 AM", subject: "Mathematics CBSE Prep", status: "upcoming" },
  { id: "sch-2", timeSlot: "03:00 PM – 04:30 PM", subject: "Physics (Friction Window)", status: "active" },
  { id: "sch-3", timeSlot: "06:30 PM – 08:00 PM", subject: "Chemistry PYQ Mastery", status: "upcoming" },
];

const INITIAL_PARENT_REQUESTS: ParentAccessRequest[] = [
  {
    id: "req-101",
    studentName: "Mayank Sharma",
    appName: "Instagram",
    appIcon: "instagram",
    requestedMinutes: 15,
    reason: "Need to check physics class project group notes with classmate",
    timestamp: "12:54 PM",
    status: "pending"
  }
];

export const useStore = create<StoreState>((set, get) => ({
  currentScene: "scene01",
  setCurrentScene: (scene) => set({ currentScene: scene }),
  phoneRef: null,
  cameraRigRef: null,
  aiCoreRef: null,
  setPhoneRef: (ref) => set({ phoneRef: ref }),
  setCameraRigRef: (ref) => set({ cameraRigRef: ref }),
  setAiCoreRef: (ref) => set({ aiCoreRef: ref }),
  
  // OTA defaults
  isOtaModalOpen: false,
  setOtaModalOpen: (open) => set({ isOtaModalOpen: open }),
  otaChannel: "stable",
  setOtaChannel: (channel) => set({ otaChannel: channel }),
  otaDownloadProgress: 0,
  setOtaDownloadProgress: (progress) => set({ otaDownloadProgress: progress }),
  isOtaDownloading: false,
  setIsOtaDownloading: (downloading) => set({ isOtaDownloading: downloading }),
  hasOtaNotification: true,
  setHasOtaNotification: (has) => set({ hasOtaNotification: has }),
  otaVersion: "v1.5.2",
  dismissOtaNotification: () => set({ hasOtaNotification: false }),
  triggerOtaNotification: () => set({ hasOtaNotification: true }),

  // Feature 1: Adaptive Study Schedule
  studySuggestions: INITIAL_SUGGESTIONS,
  activeSchedule: INITIAL_SCHEDULE,
  
  acceptStudySuggestion: (id: string) => {
    const suggestion = get().studySuggestions.find(s => s.id === id);
    if (!suggestion) return;

    set((state) => {
      const updatedSuggestions = state.studySuggestions.map(s => 
        s.id === id ? { ...s, status: "accepted" as const } : s
      );

      // Update active schedule to reflect the accepted optimization
      const updatedSchedule = state.activeSchedule.map(block => {
        if (block.subject.toLowerCase().includes(suggestion.subject.toLowerCase().split(" ")[0])) {
          return {
            ...block,
            timeSlot: suggestion.suggestedSlot,
            status: "optimized" as const
          };
        }
        return block;
      });

      return {
        studySuggestions: updatedSuggestions,
        activeSchedule: updatedSchedule,
        inAppNotification: {
          id: `toast-${Date.now()}`,
          title: "Schedule Optimized & Applied",
          message: `${suggestion.subject} shifted to ${suggestion.suggestedSlot}. Enforced via FocusDefend settings.`,
          type: "schedule_updated",
          targetScreen: "study",
          timestamp: "Just now"
        }
      };
    });
  },

  editStudySuggestion: (id: string, startTime: string, endTime: string, subject: string) => {
    set((state) => {
      const updatedSuggestions = state.studySuggestions.map(s => {
        if (s.id === id) {
          return {
            ...s,
            status: "edited" as const,
            suggestedSlot: `${startTime} – ${endTime} (Custom Slot)`,
            subject: subject || s.subject,
            customTime: { startTime, endTime, subject: subject || s.subject }
          };
        }
        return s;
      });

      const updatedSchedule = state.activeSchedule.map(block => {
        if (block.id === "sch-2" || block.subject.toLowerCase().includes("physics")) {
          return {
            ...block,
            timeSlot: `${startTime} – ${endTime}`,
            subject: subject || block.subject,
            status: "optimized" as const
          };
        }
        return block;
      });

      return {
        studySuggestions: updatedSuggestions,
        activeSchedule: updatedSchedule,
        inAppNotification: {
          id: `toast-${Date.now()}`,
          title: "Custom Study Period Saved",
          message: `Restrictions set for ${startTime} – ${endTime} via FocusDefend Knotted Guardian.`,
          type: "schedule_updated",
          targetScreen: "study",
          timestamp: "Just now"
        }
      };
    });
  },

  dismissStudySuggestion: (id: string) => {
    set((state) => ({
      studySuggestions: state.studySuggestions.map(s => 
        s.id === id ? { ...s, status: "dismissed" as const } : s
      )
    }));
  },

  resetStudySuggestions: () => {
    set({ studySuggestions: INITIAL_SUGGESTIONS, activeSchedule: INITIAL_SCHEDULE });
  },

  // Feature 2: Parent Quick Approval
  parentRequests: INITIAL_PARENT_REQUESTS,
  activeGrants: [],
  inAppNotification: null,

  requestParentAccess: (appName, appIcon, minutes, reason) => {
    const newRequest: ParentAccessRequest = {
      id: `req-${Date.now()}`,
      studentName: "Mayank Sharma",
      appName,
      appIcon,
      requestedMinutes: minutes,
      reason: reason || "Temporary access requested for academic study check",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "pending"
    };

    set((state) => ({
      parentRequests: [newRequest, ...state.parentRequests],
      inAppNotification: {
        id: `toast-${Date.now()}`,
        title: "Parent Pass Requested",
        message: `Alert sent to Parent Dashboard for ${minutes}m on ${appName}.`,
        type: "parent_request",
        targetScreen: "parent",
        timestamp: "Just now"
      }
    }));
  },

  approveParentRequest: (requestId, grantMinutes) => {
    const request = get().parentRequests.find(r => r.id === requestId);
    if (!request) return;

    const minutes = grantMinutes || request.requestedMinutes;
    const now = new Date();
    const expires = new Date(now.getTime() + minutes * 60 * 1000);

    const newGrant: ActiveTimeGrant = {
      id: `grant-${Date.now()}`,
      appName: request.appName,
      appIcon: request.appIcon,
      durationMinutes: minutes,
      remainingSeconds: minutes * 60,
      grantedAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expiresAt: expires.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "active"
    };

    set((state) => ({
      parentRequests: state.parentRequests.map(r => 
        r.id === requestId ? { ...r, status: "approved" as const } : r
      ),
      activeGrants: [newGrant, ...state.activeGrants.filter(g => g.appName !== request.appName)],
      inAppNotification: {
        id: `toast-${Date.now()}`,
        title: "Pass Approved by Parent!",
        message: `${request.appName} is unlocked for ${minutes} minutes. Auto-restores upon expiry.`,
        type: "grant_approved",
        targetScreen: "intercept",
        timestamp: "Just now"
      }
    }));
  },

  rejectParentRequest: (requestId, rejectNote) => {
    const request = get().parentRequests.find(r => r.id === requestId);
    if (!request) return;

    set((state) => ({
      parentRequests: state.parentRequests.map(r => 
        r.id === requestId ? { ...r, status: "rejected" as const, rejectNote: rejectNote || "Focus period active. Please complete study block first." } : r
      ),
      inAppNotification: {
        id: `toast-${Date.now()}`,
        title: "Request Declined by Parent",
        message: `${request.appName} remains guarded. Finish the active study session.`,
        type: "grant_rejected",
        targetScreen: "intercept",
        timestamp: "Just now"
      }
    }));
  },

  revokeGrant: (grantId) => {
    const grant = get().activeGrants.find(g => g.id === grantId);
    if (!grant) return;

    set((state) => ({
      activeGrants: state.activeGrants.filter(g => g.id !== grantId),
      inAppNotification: {
        id: `toast-${Date.now()}`,
        title: "Pass Revoked Immediately",
        message: `${grant.appName} restriction has been instantly restored.`,
        type: "grant_expired",
        targetScreen: "intercept",
        timestamp: "Just now"
      }
    }));
  },

  tickGrants: () => {
    const currentGrants = get().activeGrants;
    if (currentGrants.length === 0) return;

    let expiredAny = false;
    let expiredAppName = "";

    const updated = currentGrants.map(grant => {
      if (grant.status === "active") {
        const nextSeconds = grant.remainingSeconds - 1;
        if (nextSeconds <= 0) {
          expiredAny = true;
          expiredAppName = grant.appName;
          return { ...grant, remainingSeconds: 0, status: "expired" as const };
        }
        return { ...grant, remainingSeconds: nextSeconds };
      }
      return grant;
    });

    const activeRemaining = updated.filter(g => g.status === "active");

    set({ activeGrants: activeRemaining });

    if (expiredAny) {
      set({
        inAppNotification: {
          id: `toast-${Date.now()}`,
          title: "Temporary Pass Expired",
          message: `Time limit reached for ${expiredAppName}. FocusDefend has automatically restored the full restriction.`,
          type: "grant_expired",
          targetScreen: "intercept",
          timestamp: "Just now"
        }
      });
    }
  },

  dismissInAppToast: () => set({ inAppNotification: null })
}));
