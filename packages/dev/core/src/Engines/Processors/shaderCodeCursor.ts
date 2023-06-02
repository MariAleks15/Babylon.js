/** @internal */
export class ShaderCodeCursor {
    private _lines: string[] = [];
    lineIndex: number;

    get currentLine(): string {
        return this._lines[this.lineIndex];
    }

    get canRead(): boolean {
        return this.lineIndex < this._lines.length - 1;
    }

    set lines(value: string[]) {
        this._lines.length = 0;

        for (const line of value) {
            // Skip empty lines
            if (!line || line === "\r") {
                continue;
            }

            // Prevent removing line break in macros.
            if (line[0] === "#") {
                this._lines.push(line);
                continue;
            }

            // Do not split single line comments
            const trimmedLine = line.trim();

            if (!trimmedLine) {
                continue;
            }

            if (trimmedLine.startsWith("//")) {
                this._lines.push(line);
                continue;
            }

            // Work with semicolon in the line
            const semicolonIndex = line.indexOf(";");

            if (semicolonIndex === -1) {
                // No semicolon in the line
                this._lines.push(trimmedLine);
            } else if (semicolonIndex === line.length - 1 || semicolonIndex === trimmedLine.length - 1) {
                // Semicolon at the end of the line
                this._lines.push(line);
            } else {
                // Semicolon in the middle of the line
                const split = line.split(";");

                for (let index = 0; index < split.length; index++) {
                    let subLine = split[index];

                    if (!subLine) {
                        continue;
                    }

                    subLine = subLine.trim();

                    if (!subLine) {
                        continue;
                    }

                    this._lines.push(subLine + (index !== split.length - 1 ? ";" : ""));
                }
            }
        }
    }
}
