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

// ce qu'on voudrait:
// all([Promise<number>, Promise<string>]): Promise<[number, string]>
// all([Promise<number>, Promise<string>, Promise<boolean>]): Promise<[number, string, boolean]>
