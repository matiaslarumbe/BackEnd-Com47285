import { promises as fs } from "fs";

const setPathData = async (path) => {
  try {
    const content = [];
    const { route } = splitPathAndFileName(path);
    try {
      await fs.access(path);
      return path;
    } catch (err) {}

    await fs.mkdir(route, { recursive: true });
    await fs.writeFile(path, JSON.stringify(content));
    return path;
  } catch (error) {
    console.error("Error al crear directorio o archivo:", error);
    throw error;
  }
};

const splitPathAndFileName = (filePath) => {
  const lastSlashIndex = filePath.lastIndexOf("/");
  const route = filePath.slice(0, lastSlashIndex + 1);
  const fileName = filePath.slice(lastSlashIndex + 1);

  return {
    route,
    fileName,
  };
};

export default setPathData;
