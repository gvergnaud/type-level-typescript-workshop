/**
 * Recursive conditional types
 */

// etape 0
function all0(promises: Promise<any>[]): Promise<any[]> {
  return Promise.all(promises);
}

// etape 1: naive generic
function all1<T>(promises: Promise<T>[]): Promise<T[]> {
  return Promise.all(promises);
}

const result = all1([Promise.resolve(2), Promise.resolve("hello")]);

// result2: Promise<(string | number)[]>
const result2 = all1<number | string>([
  Promise.resolve(2),
  Promise.resolve("hello"),
]);

// what we want is
// all([Promise<number>, Promise<string>]): Promise<[number, string]>
// all([Promise<number>, Promise<string>, Promise<boolean>]): Promise<[number, string, boolean]>
