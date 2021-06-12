const express = require('express');
const fs = require('fs');
const router = express.Router();

const Excel = require('exceljs');
const api = require('../service/api');

const { transformValuesIntoArray, newData } = require('../service/utils');

router.get('/xlsx', async (req, res) => {
  try {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Prospect - Empresas');

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

    body.forEach((row) => worksheet.addRow(row));

    await workbook.xlsx.writeFile('sample.xlsx');
    
    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Ouve um erro na exportações dos dados!' });
  }
});

module.exports = app => app.use('/export', router);