export function formatText(message: string) {
    if (!message) return '';

    return message
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\*(.*)\*/g, '<b>$1</b>')
        .replace(/_(.*)_/g, '<i>$1</i>')
        .replace(/~(.*)~/g, '<strike>$1</strike>')
        .replace(/```(.*|\n)```/g, '<pre>$1</pre>')
        .replace(/\n/g, '<br>')

}