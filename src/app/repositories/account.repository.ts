export abstract class AccountRepository {
  abstract getBalance(accountId: number): Promise<number | null>;
  abstract addBalance(accountId: number, amount: number): Promise<void>;
  abstract subtractBalance(accountId: number, amount: number): Promise<void>;
}
