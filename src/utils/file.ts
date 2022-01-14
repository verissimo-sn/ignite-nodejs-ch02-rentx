import fs from 'fs';

export const deleteFile = async (filePath: string) => {
  try {
    await fs.promises.stat(filePath);
  } catch (error) {
    return;
  }

  await fs.promises.unlink(filePath);
};
