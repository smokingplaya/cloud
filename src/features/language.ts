declare namespace language {
  function Update(phrase: string, callback: (data: string) => void): void;
}

const phraseCache: Record<string, string> = {};

// https://github.com/Facepunch/garrysmod/blob/adefc390fca225ca312ab7c07b2b3544cb2a28b1/garrysmod/lua/includes/util/javascript_util.lua#L2-L9
export async function getPhrase(phrase: string): Promise<string> {
  if (phraseCache[phrase]) return phraseCache[phrase];

  return new Promise((resolve) => {
    language.Update(phrase, (data) => {
      phraseCache[phrase] = data;
      resolve(data);
    });
  });
}
