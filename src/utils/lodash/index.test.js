import { debounce, throttle } from ".";

describe("debounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should only console log the last value", () => {
    const mockFn = jest.fn();
    const debounceFn = debounce(mockFn, 100);
    debounceFn();
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalled();
  });

  it("should trigger if maxWait exist even still debouncing and will not trigger again if no new events", () => {
    const mockFn = jest.fn();
    const debounceFn = debounce(mockFn, 100, { maxWait: 250 });
    debounceFn();
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(99);
    debounceFn();
    jest.advanceTimersByTime(99);
    debounceFn();
    jest.advanceTimersByTime(50);
    debounceFn();
    jest.advanceTimersByTime(2);
    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(99);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

describe("throttle", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should only trigger once in the throttle time", () => {
    const mockFn = jest.fn();
    const throttleFn = throttle(mockFn, 100);
    throttleFn();
    throttleFn();
    throttleFn();
    jest.advanceTimersByTime(99);
    throttleFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1);
    throttleFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
