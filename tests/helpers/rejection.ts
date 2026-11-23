/**
 * The error a promise rejects with; fails when it resolves.
 *
 * Use it instead of `expect(promise).rejects` for gRPC calls: with Bun 1.4.2, a gRPC call that is awaited through
 * `.rejects` right after an earlier successful call on the same channel does not get its status until the
 * deadline (DEADLINE_EXCEEDED), while awaiting the same promise with `.then` returns the real status at once.
 * Bun 1.3.13 behaves correctly. The runtime itself does not use `expect`.
 */
export async function rejection(promise: Promise<unknown>): Promise<unknown> {
  const outcome = await promise.then(() => ({ rejected: false as const }), error => ({ rejected: true as const, error }))
  if (!outcome.rejected) throw new Error('Expected the promise to reject, but it resolved')
  return outcome.error
}
