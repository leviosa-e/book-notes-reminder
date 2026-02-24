import fs from 'fs';
import path from 'path';

const NOTES_DIR = path.join(process.cwd(), 'notes');
const OUTPUT_FILE = path.join(process.cwd(), 'daily-selection.md');
const SUBJECT_FILE = path.join(process.cwd(), 'daily-subject.txt');

function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

interface BookFragments {
    title: string;
    fragments: string[];
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

    const allBooksFragments: BookFragments[] = [];

    files.forEach(file => {
        const fullPath = path.join(NOTES_DIR, file);
        const content = fs.readFileSync(fullPath, 'utf8');

        // Find the "Detailed Notes" section
        const detailedMatch = content.match(/## 详细笔记\n([\s\S]*)$/);
        if (detailedMatch) {
            const detailedContent = detailedMatch[1];

            // Split by ### or more # (representing sections/notes inside the detailed notes)
            // We use a positive lookahead regex to split but keep the header in the fragment
            const fragments = detailedContent.split(/(?=^#{3,}\s)/m)
                .map(f => f.trim())
                .filter(f => f.length > 10); // Filter out very short fragments or empty lines

            if (fragments.length > 0) {
                allBooksFragments.push({
                    title: file.replace('.md', ''),
                    fragments: fragments
                });
            }
        }
    });

    if (allBooksFragments.length === 0) {
        console.error('No fragments found in "Detailed Notes" sections');
        process.exit(1);
    }

    // Shuffle books to ensure variety
    shuffle(allBooksFragments);

    // Pick 8 fragments total
    // We alternate between books to ensure a diverse selection
    const selectedNotes: { bookTitle: string, content: string }[] = [];
    let bookIndex = 0;

    // Safety counter to prevent infinite loop
    let attempts = 0;
    const maxAttempts = 1000;

    while (selectedNotes.length < 8 && attempts < maxAttempts) {
        const book = allBooksFragments[bookIndex % allBooksFragments.length];
        if (book.fragments.length > 0) {
            const fragIndex = Math.floor(Math.random() * book.fragments.length);
            const fragment = book.fragments.splice(fragIndex, 1)[0];
            selectedNotes.push({ bookTitle: book.title, content: fragment });
        }

        // Check if all fragments are exhausted
        const totalRemaining = allBooksFragments.reduce((acc, b) => acc + b.fragments.length, 0);
        if (totalRemaining === 0) break;

        bookIndex++;
        attempts++;
    }

    const count = selectedNotes.length;
    let content = `# 今日读书笔记精选 (${new Date().toLocaleDateString()})\n\n`;
    content += `为您从笔记库中随机选取了 ${count} 条精彩片段：\n\n---\n\n`;

    selectedNotes.forEach((note, index) => {
        content += `## ${index + 1}. 来自《${note.bookTitle}》\n\n`;
        content += note.content;
        content += '\n\n---\n\n';
    });

    content += `\n*温故而知新，可以为师矣。*\n`;

    fs.writeFileSync(OUTPUT_FILE, content);
    fs.writeFileSync(SUBJECT_FILE, `读书笔记每日推送 - ${new Date().toISOString().split('T')[0]}`);

    console.log(`Successfully picked ${count} note fragments from across ${allBooksFragments.length} books.`);
}

pickNotes();
