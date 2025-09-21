// rename-key.test.ts
import { expectTypeOf, test } from 'vitest';
import type { RenameKey } from './rename-key';

interface User {
  id: number;
  fullName: string;
}

type RenamedUser = RenameKey<User, 'fullName', 'name'>;

test('RenameKey renames fullName → name', () => {
  // Check that `RenamedUser` has expected properties
  expectTypeOf<RenamedUser>().toHaveProperty('id').toEqualTypeOf<number>();
  expectTypeOf<RenamedUser>().toHaveProperty('name').toEqualTypeOf<string>();

  // @ts-expect-error: fullName should not exist anymore
  expectTypeOf<RenamedUser>().toHaveProperty('fullName');
});
