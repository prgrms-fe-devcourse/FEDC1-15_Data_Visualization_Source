export function makeBoard(boardId, text, colorScheme) {
  const width = 264;
  const height = 120;

  const boardBox = d3.select(boardId);

  const div = boardBox.append('div')
    .style('width', width + 'px');

  div.append('div')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('text-align', 'center')
    .style('font-size', '40px')
    .style('font-weight', 'bold')
    .style('width', width + 'px')
    .style('height', height + 'px')
    .style('color', colorScheme[0])
    .append('div')
    .style('width', width + 'px')
    .text(text);
}