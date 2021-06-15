import React from 'react';
import Excel from "exceljs";

import { saveAs } from "file-saver";
import { transformValuesIntoArray, newData } from "./service/utils";

import api from "./service/api";

const generateXlsxTemplate = async () => {
	const workbook = new Excel.Workbook();
	const worksheet = workbook.addWorksheet('Prospect - Empresas');

	worksheet.properties.defaultColWidth = 25;

	// const imageBuffer = await axios.get('../img/inovall.png', { responseType: 'arraybuffer' });
	// const imageBase64 =  Buffer.from(imageBuffer.data, 'binary').toString('base64');

	// const image = workbook.addImage({
	// 	base64: imageBase64,
	// 	extension: 'png',
	// });
	
	// worksheet.mergeCells('A1:B4');
	// worksheet.addImage(image, {
	// 	tl: { col: 0, row: 0 },
	// 	ext: { width: 125, height: 75 },
	// 	hyperlinks: {
	// 		hyperlink: 'https://www.busca.plus/',
	// 		tooltip: 'https://www.busca.plus/'
	// 	}
	// });

	const { data } = await api.get('ProspectEmpresa');

	const json = newData(data);
	const header = Object.values(json.header);
	const body = transformValuesIntoArray(json.body);

	worksheet.mergeCells('F1', 'I4');
  const titleRow = worksheet.getCell('F1');
  titleRow.value = 'Título';

  titleRow.font = {
		name: 'Calibri',
		size: 16,
		underline: 'single',
		bold: true,
		color: { argb: '0085A3' }
  }

  titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

	const headerRow = worksheet.addRow(header);
	
	headerRow.eachCell((cell, number) => {
		cell.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: '4167B8' },
		}
		cell.font = {
			bold: true,
			size: 12,
			color: { argb: 'FFFFFF' },
		}
	});

	body.forEach((row, index) => {
		const line = worksheet.addRow(row, index);

		if (index % 2 === 1) {
			line.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'd1d1d1' },
			}
		}
	});

	const buffer = await workbook.xlsx.writeBuffer();

	saveAs(
		new Blob([buffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		}), 'sample.xlsx'
	);
}

const App = () => {
  	return (
		<>
			<button onClick={generateXlsxTemplate}>Gerar Excel</button>
		</>
  	);
}

export default App;
