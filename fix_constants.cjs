const fs = require('fs');

const fileContent = fs.readFileSync('constants.ts', 'utf8');

const updatedBlock = `  {
    id: "mem-002",
    title: "Look What I Did With AI",
    date: "Unreleased",
    description: "This is an unreleased song that I was working on called 'Look What I Did With AI'. I used AI to generate the video and some of the music, but I wrote the song myself.",
    url: "https://dl.dropboxusercontent.com/scl/fi/q5us12oci4f3hdfh3cphr/ai-music.mp4?rlkey=apc7y7bilfhgeyiorv7f3amt9&st=e2333sph&raw=1",
    thumbnail: "https://dl.dropboxusercontent.com/scl/fi/euzhbk1xt83g9levojbyr/Screenshot_20260224_112529.png?rlkey=fm5ht8r3lxdgzib88bfkyfnmv&st=ai9x62ku&raw=1",
    type: "video"
  }
];`;

// Replace the end of the MEMORY_VIDEOS array with the new block.
// The MEMORY_VIDEOS array currently ends with "type: "video"\n  }\n];" around line 244.
const memoryVideosEndRegex = /type:\s*"video"\s*\}\s*\];/;
const match = fileContent.match(memoryVideosEndRegex);

if (match) {
    const newContent = fileContent.replace(memoryVideosEndRegex, `type: "video"\n  },\n${updatedBlock}`);
    fs.writeFileSync('constants.ts', newContent);
    console.log("Successfully appended mem-002");
} else {
    console.log("Could not find end of MEMORY_VIDEOS");
}
