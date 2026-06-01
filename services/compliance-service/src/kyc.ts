export type KYCLevel = 'NONE' | 'BASIC' | 'ENHANCED' | 'FULL';

export interface KYCProfile {
  userId: string;
  documentVerified: boolean;
  faceVerified: boolean;
  addressVerified: boolean;
  riskFlags?: string[];
}

export function evaluateKYC(profile: KYCProfile): KYCLevel {
  const score = [
    profile.documentVerified,
    profile.faceVerified,
    profile.addressVerified
  ].filter(Boolean).length;

  if (profile.riskFlags && profile.riskFlags.length > 0) {
    return 'NONE';
  }

  if (score === 3) return 'FULL';
  if (score === 2) return 'ENHANCED';
  if (score === 1) return 'BASIC';
  return 'NONE';
}