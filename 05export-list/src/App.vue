<template>
  <div id="app">
    <button @click="exportFile">导出文件</button>
  </div>
</template>

<script>
import * as ExcelJs from 'exceljs';
import { saveAs } from 'file-saver';

export default {
  name: 'App',
  methods: {
    exportFile() {
      // 1.创建workerbook
      let workerbook = new ExcelJs.Workbook();
      // 2.给workerbook添加worksheet
      let worksheet = workerbook.addWorksheet('first-sheet');
      // 3.给worksheet设置列
      worksheet.columns = [
        { header: '姓名', key: 'name', width: 20 },
        { header: '性别', key: 'gender', width: 10 },
        { header: '学历', key: 'edu1', width: 15 },
        { header: '学历2', key: 'edu2', width: 15 },
      ]
      // 4.给workersheet添加数据
      let list = [
        { name: '', gender: '', edu1: '第一学历', edu2: '第二学历' },
        { name: '张三', gender: '男', edu1: '本科', edu2: '院士' },
        { name: '李四', gender: '女', edu1: '硕士', edu2: '院士' },
        { name: '王二', gender: '男', edu1: '博士', edu2: '院士' },
      ]
      worksheet.addRows(list);

      let headerRow = worksheet.getRow(1);
      // headerRow.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: {
      //     argb: 'ff0000'
      //   }
      // }
      headerRow.eachCell(cell => {
        // 设置单元格背景色
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: 'ff0000'
          }
        }
        // 设置单元格字体
        cell.font = {
          color: {
            argb: 'ffffff'
          },
          size: 20
        }
        // 设置对齐
        cell.alignment = {
          horizontal: 'center',
          vertical: 'middle',
          // textRotation: 45
        }
      })

      // 合并单元格（以下三个写法一个效果）
      // worksheet.mergeCells('A1:C3');
      // worksheet.mergeCells('A1', 'C3');
      // worksheet.mergeCells(1, 1, 3, 3); // 开始行，开始列，结束行，结束列
      worksheet.mergeCells('A1:A2');
      worksheet.mergeCells('B1:B2');
      worksheet.mergeCells('C1:D1');

      // 5.将内存里的excel导出到本地
      workerbook.xlsx.writeBuffer().then(data => {
        let blob = new Blob([data]);
        saveAs(blob, '新建excel.xlsx');
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
