const copyClipboard = async (imageUrl: string) => {
  const permission = await navigator.permissions.query({ name: "clipboard-write" } as any);
  if (permission.state === "granted") {
    await navigator.clipboard.writeText(`![LGTM](${imageUrl})`);
  }
};

export default copyClipboard;
