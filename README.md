# checkAll
> JQuery plugin with checkbox all selected

### preview

![demo preview](https://github.com/shulkme/checkAll/blob/master/preview.gif)

### Example:

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
          // init callback
          // params : len, count, length , ids, value, nodes
          $('.statusbar').text(len+' items, checked '+count+' item');
      },
      onCheck: function(id,val,len,count,ids,nodes,value){
          // checking callback
          // params : id,val,len,count,ids,value,nodes
    
      },
      onFull : function (count,ids,nodes) {
          // all in checked callback
          // params : count|len, length , ids, value, nodes
          $('.statusbar').text(count+' items, checked '+count+' item');
      },
      onEmpty : function (len) {
          //no checked items callback
          // params : len
          $('.statusbar').text(len+' items, checked 0 item');
      }
});
```
### Result
> Normally, all the data can be obtained by passing the parameters of the callback function. If you need to manually obtain it, you can directly call the getResult prototype.

``` javascript
//like this
var obj = $('.checkAll').checked({
//options
});

//then

var xxx = obj.getResult();
//It will return an object
/* 
xxx = {
    len   : _len,   // items length
    count : _count, // checked count
    index : _index, // index set
    nodes : _nodes, // items nodes
    value : _value  // value set
}
*/
```
