import fs from 'fs';
import path from 'path';

const NOTES_DIR = path.join(process.cwd(), 'notes');
const OUTPUT_FILE = path.join(process.cwd(), 'daily-selection.md');
const SUBJECT_FILE = path.join(process.cwd(), 'daily-subject.txt');

function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function pickNotes() {
    if (!fs.existsSync(NOTES_DIR)) {
        console.error('Notes directory not found');
        process.exit(1);
    }

    const files = fs.readdirSync(NOTES_DIR).filter(file => file.endsWith('.md'));

    if (files.length === 0) {
        console.error('No markdown notes found in notes directory');
        process.exit(1);
    }

    // Pick 8 random notes, or all if less than 8
    const count = Math.min(files.length, 8);
    const selectedFiles = shuffle([...files]).slice(0, count);

    let content = `# 今日读书笔记精选 (${new Date().toLocaleDateString()})\n\n`;
    content += `为您从笔记库中随机选取了 ${count} 条笔记：\n\n---\n\n`;

    selectedFiles.forEach((file, index) => {
        const noteContent = fs.readFileSync(path.join(NOTES_DIR, file), 'utf-8');
        const title = file.replace('.md', '');
        content += `## ${index + 1}. ${title}\n\n`;
        content += noteContent;
        content += '\n\n---\n\n';
    });

    content += `\n*温故而知新，可以为师矣。*\n`;

    fs.writeFileSync(OUTPUT_FILE, content);
    fs.writeFileSync(SUBJECT_FILE, `读书笔记每日推送 - ${new Date().toISOString().split('T')[0]}`);

    console.log(`Successfully picked ${count} notes.`);
}

pickNotes();
