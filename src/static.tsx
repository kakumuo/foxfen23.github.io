export const randomColor = () => {
    const hexList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    return `#${Array(6).map(_ => hexList[Math.floor(Math.random() * hexList.length)]).join("")}`
}

export const grade = (hexColor:string, grade:number) => {
    const targetGrade = Math.max(Math.min(grade, 10), -10)

    // Remove the leading '#' from the hexadecimal string
    hexColor = hexColor.slice(1);

    // Convert the hexadecimal string to an array of RGB values
    const rgb = [
    parseInt(hexColor.slice(0, 2), 16),
    parseInt(hexColor.slice(2, 4), 16),
    parseInt(hexColor.slice(4, 6), 16),
    ];

    // Adjust the RGB values based on the input number
    const adjustedRgb = rgb.map((value) => Math.max(0, Math.min(255, value + targetGrade * 25.5)));

    // Convert the adjusted RGB values back to a hexadecimal string
    const adjustedHexColor = "#" + adjustedRgb.map((value) => value.toString(16).padStart(2, "0")).join("");

    return adjustedHexColor;
}