export type PromiseCancel<T> = {
  promise: Promise<T>;
  cancel: () => void;
};

export function cancelablePromise<T>(promise: Promise<T>): PromiseCancel<T> {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((value) => {
        if (!hasCanceled) {
          resolve(value);
        }
      })
      .catch((error) => {
        if (!hasCanceled) {
          reject(error);
        }
      });
  });

  function cancel() {
    hasCanceled = true;
  }

  return {
    promise: wrappedPromise,
    cancel,
  };
}
