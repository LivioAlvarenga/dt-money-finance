export class TooManyRequestsError extends Error {
  constructor() {
    super(
      'Foi atingido o numero máximo de requests, aguarde um momento e tente novamente',
    )
  }
}
