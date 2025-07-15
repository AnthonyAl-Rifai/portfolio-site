function throttle<T extends (...args: any[]) => any>(func: T, limit: number) {
  if (typeof func !== "function") {
    return (...args: Parameters<T>) => {};
  }

  let inThrottle = false;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;

    if (!inThrottle) {
      func.apply(context, args as unknown as any[]);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args as unknown as any[]);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan)
      );
    }
  };
}

export default throttle;
