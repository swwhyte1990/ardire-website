export interface PendingEnquiry {
  service: string;
  message: string;
}

let _pending: PendingEnquiry | null = null;

export function setPendingEnquiry(enquiry: PendingEnquiry): void {
  _pending = enquiry;
}

export function takePendingEnquiry(): PendingEnquiry | null {
  const enquiry = _pending;
  _pending = null;
  return enquiry;
}
