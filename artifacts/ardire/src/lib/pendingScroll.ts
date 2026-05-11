let _target: string | null = null;

export function setPendingScroll(id: string): void {
  _target = id;
}

export function takePendingScroll(): string | null {
  const id = _target;
  _target = null;
  return id;
}
