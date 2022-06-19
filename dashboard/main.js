import { makeChart as initArcChart } from './charts/big_percentage_arc_chart.js';
import { makeBoard as initTextBoard } from './charts/text-board.js';
import { makeChart as initLineChart } from './charts/line_chart.js';
import { makeChart as initStackedBarChart } from './charts/stacked_bar_chart.js';
import { makeChart as initMultiLineChart } from './charts/multi_line_chart.js';
import { makeChart as initMultiLineWithInputChart } from './charts/multi_line_w_input_chart.js';
import {
  getBtsWriteRatioData,
  getBtsComposeRatioData,
  getBtsMakeOwnSongData,
  getBoyBandWriteData,
  getBoyBandComposeData,
  getBoybandOwnSongData,
  getSongByBtsMembersData
} from './services/bts_data.js';

async function initCharts() {
  const colorScheme = d3.schemeTableau10;

  const btsWriteRatio = await getBtsWriteRatioData();
  initArcChart('#write-arc-chart', btsWriteRatio, colorScheme, '멤버 작사 참여 비율'); // chartId, data

  const btsComposeRatio = await getBtsComposeRatioData();
  initArcChart('#compose-arc-chart', btsComposeRatio, colorScheme, '멤버 작곡 참여 비율'); // chartId, data

  initTextBoard('#total-song-board', 226, colorScheme);

  initTextBoard('#total-album-board', 38, colorScheme);

  const btsMakeOwnSongData = await getBtsMakeOwnSongData();
  initLineChart('#bts-make-own-song-line-chart', btsMakeOwnSongData, colorScheme);

  const boybandWriteData = await getBoyBandWriteData();
  initStackedBarChart('#boyband-write-bar-chart', boybandWriteData, colorScheme);

  const boybandComposeData = await getBoyBandComposeData();
  initStackedBarChart('#boyband-compose-bar-chart', boybandComposeData, colorScheme);

  const boyBandOwnSongData = await getBoybandOwnSongData();
  initMultiLineChart('#boyband-make-own-song-line-chart', boyBandOwnSongData, colorScheme);
  
  const songByBtsMemberData = await getSongByBtsMembersData();
  initMultiLineWithInputChart('#song-by-btsmembers-line-chart', songByBtsMemberData, colorScheme);
}

initCharts();