 scrapbox.PopupMenu.addButton({
     title: function (text) {
         var times = text.match(/\d{1,2}/g)
         if(!text || !times || times.length != 4) { return }
         var sh, sm, bh, bm
         [sh, sm, bh, bm] = times.map(x => parseInt(x))
         if (sh > 12) {
	        	sh = sh - 24
         }
         var hour = bh - (sh + 1)
         var minutes = bm + 60 - sm
         if (minutes >= 60){
             hour += 1
             minutes -= 60
         }
         var result = ('00' + hour).slice(- 2) + ':' + ('00' + minutes).slice(-2)
         return `${result}`
     },
     onClick: () => null
     })
