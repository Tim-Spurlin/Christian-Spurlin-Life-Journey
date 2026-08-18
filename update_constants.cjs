const fs = require('fs');

const fileContent = fs.readFileSync('constants.ts', 'utf8');

// Find the mem-002 block.
const mem002Regex = /\{\s*id:\s*"mem-002"[\s\S]*?type:\s*"video"\s*\},?/m;
const match = fileContent.match(mem002Regex);

if (match) {
    let newContent = fileContent.replace(mem002Regex, ''); // Remove it from the current position

    // Create the updated block
    const updatedBlock = `{
    id: "mem-002",
    title: "Look What I Did With AI",
    date: "Unreleased",
    description: "This is an unreleased song that I was working on called 'Look What I Did With AI'. I used AI to generate the video and some of the music, but I wrote the song myself.",
    url: "https://dl.dropboxusercontent.com/scl/fi/q5us12oci4f3hdfh3cphr/ai-music.mp4?rlkey=apc7y7bilfhgeyiorv7f3amt9&st=e2333sph&raw=1",
    thumbnail: "https://dl.dropboxusercontent.com/scl/fi/euzhbk1xt83g9levojbyr/Screenshot_20260224_112529.png?rlkey=fm5ht8r3lxdgzib88bfkyfnmv&st=ai9x62ku&raw=1",
    type: "video"
  }`;

    // Find the end of MEMORY_VIDEOS array (before the closing ]; that ends the file or array)
    // Looking at the end of the file, it ends with ];
    // Let's insert it right before the last ];
    newContent = newContent.replace(/];$/, '  ' + updatedBlock + '\n];');
    
    fs.writeFileSync('constants.ts', newContent);
    console.log("Successfully updated constants.ts");
} else {
    console.log("Could not find mem-002 block");
}
