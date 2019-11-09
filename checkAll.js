/**
 * checkALl
 * shulkme
 * 2019-11-09
 * v0.0.1
 * https://github.com/shulkme/checkAll
 */
(function ($) {
    'use strict';
    var defaults = {
        name : '',
        inverter:'',
        vagueCls: '',
        onInit : function(){
            // init callback
            // return count, length , ids, value, nodes
        },
        onCheck: function(){
            // checking callback
            // return id,val,count,ids,value,nodes
        },
        onFull : function () {
            // all in checked callback
            // return count, length , ids, value, nodes
        },
        onEmpty : function () {
            //no checked items callback
        }
    };
    var CheckAll = function (element,options) {
        this.trigger = $(element);
        this.opts = $.extend({}, defaults, options);
        this.sync('-1');
        if (typeof this.opts.onInit == 'function'){
            var _res = this.getResult();
            this.opts.onInit.call(this,_res.len,_res.count,_res.index,_res.value,_res.nodes);
        }
        this.bind();
    };
    CheckAll.prototype.items = function(){
        return $('input[type="checkbox"][name="'+this.opts.name+'"]');
    };
    CheckAll.prototype.bind = function(){
        var _this = this;
        $(document).on('change','input[type="checkbox"][name="'+_this.opts.name+'"]',function (e) {
            var _item = $(this),
                _index,
                _value,
                _res;
                _res = _this.getResult();
                _index = _this.items().index(this);
                _value = _item.val();
            if (typeof _this.opts.onCheck == 'function'){
                _this.opts.onCheck.call(this,_index,_value,_res.len,_res.count,_res.index,_res.value,_res.nodes);
            }
        });
        $.each(_this.trigger,function (k,e) {
            var _ele = $(e);
            if (_ele.attr('type') === 'checkbox'){
                _ele.on('change',function () {
                    if (_ele.prop('checked')){
                        _this.toggleStatus('1');
                    } else {
                        _this.toggleStatus('-1');
                    }
                });
            }else{
                _ele.on('click',function () {
                    if (_ele.attr('data-checked') === 'false'){
                        _this.toggleStatus('1');
                    } else {
                        _this.toggleStatus('-1');
                    }
                });
            }
        });
        $(_this.opts.inverter).on('click',function () {
            _this.toggleStatus('0');
        });
    };
    CheckAll.prototype.getResult = function(){
        var _this  = this,
            _items = this.items(),
            _len   = _items.length,
            _count = 0,
            _index = [],
            _nodes = [],
            _value = [];
        $.each(_items,function (k,e) {
            if ($(e).prop('checked')){
                _count ++;
                _index.push(k);
                _nodes.push(e);
                _value.push($(e).val())
            }
        });
        if (_count > 0) {
            if (_count === _len){
                //all in checked
                if (typeof _this.opts.onFull == 'function'){
                    //callback
                    _this.opts.onFull.call(this,_count,_index,_value,_nodes);
                }
                _this.sync('1');
            } else{
                //checked items >=1
                _this.sync('0');
            }
        } else{
            //no checked
            if (typeof _this.opts.onEmpty == 'function'){
                //callback
                _this.opts.onEmpty.call(this,_len);
            }
            _this.sync('-1');
        }
        return {
            len   : _len,
            count : _count,
            index : _index,
            nodes : _nodes,
            value : _value
        }
    };
    CheckAll.prototype.toggleStatus = function($status = '1'){
        var _this = this,
            _items = this.items();
        $.each(_items,function (k,e) {
            switch ($status) {
                case "-1":
                    //unchecked
                    $(e).prop('checked',false);
                    break;
                case "0":
                    //inverse
                    $(e).prop('checked',function () {
                        return !$(e).prop('checked');
                    });
                    break;
                case "1":
                    //checked
                    $(e).prop('checked',true);
                    break;
            }
        });
        return _this.getResult();
    };
    CheckAll.prototype.sync = function($status = "-1"){
        var _this = this,
            _trigger = this.trigger;
        $.each(_trigger,function (k,e) {
            var _ele = $(e);
            if (_ele.attr('type') === 'checkbox'){
                //checked element
                switch ($status) {
                    case "-1":
                        //no checked
                        _ele.prop('checked',false);
                        _ele.prop('indeterminate',false);
                        _ele.removeClass(_this.opts.vagueCls);
                        break;
                    case "0":
                        //indeterminate
                        _ele.prop('checked',false);
                        _ele.prop('indeterminate',true);
                        _ele.addClass(_this.opts.vagueCls);
                        break;
                    case "1":
                        //all in checked
                        _ele.prop('checked',true);
                        _ele.prop('indeterminate',false);
                        _ele.removeClass(_this.opts.vagueCls);
                        break;
                }
            }else{
                //other element
                switch ($status) {
                    case "-1":
                        //no checked
                        _ele.attr('data-checked',false);
                        break;
                    case "0":
                        //indeterminate
                        _ele.attr('data-checked',false);
                        break;
                    case "1":
                        //all in checked
                        _ele.attr('data-checked',true);
                        break;
                }
            }
        });
    };
    $.fn.checkAll = function(options) {
        return new CheckAll(this,options);
    };
})(jQuery);