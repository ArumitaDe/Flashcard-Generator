function ClozeCard(text,cloze) 
    {
    this.text = text;
    this.cloze = cloze;
    if((this.text).includes(this.cloze) )
    {
    
    this.clozeDelete = function() 
    {
    var clozeDeletedString=this.text.replace(this.cloze,'..........');
    return clozeDeletedString;
    };
    }
    else
    {
    return (this.cloze + " is not a part of the string '"+ this.text+"'");
    }
    };
module.exports=ClozeCard;