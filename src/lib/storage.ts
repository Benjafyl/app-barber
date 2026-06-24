import path from "node:path";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { getServerEnv } from "@/lib/env";

export const storageService = {
  async upload(key: string, content: Buffer) {
    const absolutePath = path.join(getServerEnv().UPLOADS_DIR, key);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content);
    return { key };
  },
  getPublicPath(key: string) {
    return `/uploads/${key}`;
  },
  async delete(key: string) {
    await unlink(path.join(getServerEnv().UPLOADS_DIR, key));
  },
};
