import { Request, Response, NextFunction } from 'express';
import { runAMLCheck } from '../../compliance-service/src/aml';
import { evaluateKYC } from '../../compliance-service/src/kyc';

export async function complianceMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const aml = runAMLCheck({
    userId: user.id,
    amount: req.body.amount || 0,
    country: req.headers['x-country'] as string
  });

  if (aml.risk === 'BLOCKED') {
    return res.status(403).json({ error: 'AML BLOCKED', reasons: aml.reasons });
  }

  const kycLevel = evaluateKYC({
    userId: user.id,
    documentVerified: true,
    faceVerified: true,
    addressVerified: true,
    riskFlags: []
  });

  if (kycLevel === 'NONE') {
    return res.status(403).json({ error: 'KYC REQUIRED' });
  }

  next();
}