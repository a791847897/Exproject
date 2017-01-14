/**
 * Created by admin on 2016/12/26.
 */
/**
 * Created by admin on 2016/12/26.
 */
var casper = require('casper').create();
var fs = require('fs');
var url = 'http://www.lkhweb.com/';

phantom.outputEncoding = "gb2312";
casper.on('remote.message', function (msg) {
    //ctl控制台窗口
    console.log('捕获evaluete输出信息： ' + msg);
});
casper.start(url, function () {

    console.log('开始打开一个网站');
    console.log(url);
});

var DataAll;
casper.then(function () {
    this.page.injectJs('node_modules/jquery/dist/jquery.js');
    var collect=casper.evaluate(function () {
        var pager={};
        var array=[];
        var array1=[];
        var array2=[];
        var array3=[];

        $('.content').children().each(function (index,element) {
            var item={};
            if(element.tagName==='ARTICLE'){
                item.title=$(element).find('header').children('h1').children('a').text();
                item.titleurl=$(element).find('header').children('h1').children('a').attr('href');
                item.author=$(element).find('header').find('span').eq(0).text();
                item.time=$(element).find('header').find('span').eq(1).text();
                item.sort=$(element).find('header').find('p').find('span').eq(2).find('a').eq(0).text();
                item.sort1=$(element).find('header').find('p').find('span').eq(2).find('a').eq(1).text();
                item.sorturl=$(element).find('header').find('p').find('span').eq(2).find('a').eq(0).attr('href');
                item.sorturl2=$(element).find('header').find('p').find('span').eq(2).find('a').eq(1).attr('href');
                item.watchtime=$(element).find('header').find('span').eq(3).text();
                item.content=$(element).children('DIV').find('p').text();
                item.img=$(element).children('DIV').find('.article-img').children().attr('src');
                item.imgtext=$(element).children('DIV').find('.article-img').children().attr('alt');
                item.readall=$(element).find('.article-footer').children('a').text();
                item.readallurl=$(element).find('.article-footer').children('a').attr('href');
                array.push(item);
            }
            pager.content_body=array;
        });


           $('.header-wrap-sub').children().each(function (index, element) {
               var navbar={};
                  if(element.tagName==='UL'){
                     navbar.name0=$(element).children('li').eq(0).find('a').text();
                      navbar.name1=$(element).children('li').eq(1).find('a').text();
                      navbar.name2=$(element).children('li').eq(2).find('a').text();
                      navbar.name3=$(element).children('li').eq(3).find('a').text();
                      navbar.name4=$(element).children('li').eq(4).find('a').text();
                      navbar.name0url=$(element).children('li').eq(0).find('a').attr('href');
                      navbar.name1url=$(element).children('li').eq(1).find('a').attr('href');
                      navbar.name2url=$(element).children('li').eq(2).find('a').attr('href');
                      navbar.name3url=$(element).children('li').eq(3).find('a').attr('href');
                      navbar.name4url=$(element).children('li').eq(4).find('a').attr('href');


                    array1.push(navbar);
                  }
               pager.navtitle=array1;
           });

        $('.sidebar').children('section').eq(0).children('ul').children('li').each(function (index,element) {
            var sidebar1={};
            sidebar1.title=$(element).children('a').text();
            sidebar1.titleurl=$(element).children('a').attr('href');
            array2.push(sidebar1);
        })
        pager.sidebarfirst=array2;
        return pager;
    });
    DataAll=collect;
});
casper.then(function () {
    //文件内容【对象转换成json】
    var fsInfo = JSON.stringify(DataAll);
    fs.write("my.json", fsInfo, 644);

});
casper.run();