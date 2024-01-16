var color = 'white';
for(var i = 0; i <8;i++){
    document.write("<tr>");
    for(var j;j<8;j++){
        document.write("<td class='"+color+"'></td>")
        color = (color == 'white')?'black':'white';
    }

}
