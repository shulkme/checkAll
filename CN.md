# checkAll
> 复选框全选jquery插件

### 效果预览

![demo preview](https://github.com/shulkme/checkAll/blob/master/preview.gif)

### 示例

``` html
<table>
    <thead>
        <tr>
            <th>
                <label class="checkbox">
                    <input type="checkbox" class="checkAll">
                    <span class="checkbox-label">checkAll</span>
                </label>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <label class="checkbox">
                    <input type="checkbox" name="checkGroup" value="1">
                    <span class="checkbox-label">checkbox1</span>
                </label>
            </td>
        </tr>
        ...
        ...
        ...
    </tbody>
    <tfoot>
        <tr>
            <td>
                <button class="checkAll">CheckAll</button>
                <button class="invert">Invert</button>
                <button class="add">Add item</button>
                <span class="statusbar"></span>
            </td>
        </tr>
    </tfoot>
</table>
```
``` javascript
$('.checkAll').checkAll({
      name : 'checkGroup',
      inverter: '.invert',
      vagueCls: 'indeterminate',
      onInit : function(len,count,ids,nodes,value){
          // 初始化回调
          // 可用参数 : len, count, length , ids, value, nodes
          $('.statusbar').text(len+' items, checked '+count+' item');
      },
      onCheck: function(id,val,len,count,ids,nodes,value){
          // 选择回调，触发复选框时回调
          // 可用参数 : id,val,len,count,ids,value,nodes
          $('.statusbar').text(len+' items, checked '+count+' item');
      },
      onFull : function (count,ids,nodes) {
          // 全部选中时回调
          // 可用参数 : count|len, length , ids, value, nodes
          $('.statusbar').text(count+' items, checked '+count+' item');
      },
      onEmpty : function (len) {
          //没有被选项时回调
          // 可用参数 : len
          $('.statusbar').text(len+' items, checked 0 item');
      }
});
```
### Result
> 通常情况，通过回调函数的传递参数就可以获取到所有数据，如果需要手动获取，直接调用getResult原型即可

``` javascript
//像这样
var obj = $('.checkAll').checked({
//options
});

//然后

var xxx = obj.getResult();
//他会返回一个json对象
/* 
xxx = {
    len   : _len,   // 所有复选框的数量
    count : _count, // 被选中的复选框数量
    index : _index, // 被选中的索引集合
    nodes : _nodes, // 被选中的节点集合
    value : _value  // 被选中的值集合
}
*/
```
