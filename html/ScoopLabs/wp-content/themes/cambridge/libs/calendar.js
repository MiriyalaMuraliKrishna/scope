function setCalendars(){
    jQuery('.registg_cont').each(function(){
        var dateObject = new Date();

        var year = dateObject.getFullYear();
        var month = dateObject.getMonth() + 1;
        var date = dateObject.getDate();

        var day = dateObject.getDay() ? dateObject.getDay() - 1 : 6;

        generateMonth( this, year, month, date, day );
    });
}

function generateMonth( _calendar, year, month, date, day ){
    var yearString = year.toString();

    var intercalary = (
        yearString.slice( -2, -1 ) % 2 === 0
        && [ '0', '4', '8' ].indexOf( yearString.slice( -1 ) ) >= 0
    ) || (
        yearString.slice( -2, -1 ) % 2 === 1
        && [ '2', '6' ].indexOf( yearString.slice( -1 ) ) >= 0
    );

    var daysInMonthes = [
        31,
        intercalary ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];

    var monthes = JSON.parse( jQuery( _calendar ).attr('data-monthes') );

    var firstDayOfMonth = Math.abs( 7 - ( Math.abs( 28 + date - day - 1 ) % 7 ) ) % 7;

    var daysInCurrentMonth = daysInMonthes[ month - 1 ];

    var weeksCount = Math.ceil( ( daysInCurrentMonth + firstDayOfMonth ) / 7 );

    var daysInPreviousMonth = daysInMonthes[ month==1 ? 11 : month - 2 ];

    var view = document.createElement('div');
    view.className = 'timing-calendar';


    // var buttonMonthPrev = document.createElement('button');
    // buttonMonthPrev.innerHTML = '<';
    // buttonMonthPrev.className = 'small';
    // buttonMonthPrev.onclick = function(){
    //     var prevMonth = month==1 ? 12 : month - 1;
    //     var prevYear = month==1 ? year - 1 : year;

    //     var dayForPM = firstDayOfMonth - 1;
        
    //     generateMonth( _calendar, prevYear, prevMonth, daysInPreviousMonth, dayForPM );
    // }
    // view.appendChild( buttonMonthPrev );

    // var spanMonth = document.createElement('span');
    // spanMonth.innerHTML = monthes[ month - 1 ] + ' - ' + year;
    // view.appendChild( spanMonth );

    jQuery('.calendar-month').html( monthes[ month - 1 ] );
    jQuery('.calendar-year').html( year );

    
    jQuery('.calendar-prev-month').off('click').on('click', function(){
        var prevMonth = month==1 ? 12 : month - 1;
        var prevYear = month==1 ? year - 1 : year;

        var dayForPM = firstDayOfMonth - 1;
        
        generateMonth( _calendar, prevYear, prevMonth, daysInPreviousMonth, dayForPM );
    });
    jQuery('.calendar-next-month').off('click').on('click', function(){
        var nextMonth = month==12 ? 1 : month + 1;
        var nextYear = month==12 ? year + 1 : year;

        var dayForNM = ( firstDayOfMonth + daysInCurrentMonth ) % 7;
        
        generateMonth( _calendar, nextYear, nextMonth, 1, dayForNM, false );
    });

    // var buttonMonthNext = document.createElement('button');
    // buttonMonthNext.innerHTML = '>';
    // buttonMonthNext.className = 'small';
    // buttonMonthNext.onclick = function(){
    //     var nextMonth = month==12 ? 1 : month + 1;
    //     var nextYear = month==12 ? year + 1 : year;

    //     var dayForNM = ( firstDayOfMonth + daysInCurrentMonth ) % 7;
        
    //     generateMonth( _calendar, nextYear, nextMonth, 1, dayForNM, false );
    // }
    // view.appendChild( buttonMonthNext );

    
    var inView = document.createElement('div');
    jQuery(inView).addClass('calendar-table-section');
    view.appendChild( inView );

    var table = document.createElement('table');
    jQuery(table).addClass('calendar-table');

    var daysTitles = JSON.parse( jQuery( _calendar ).attr('data-days') );

    var tr = document.createElement('tr');
    for ( var d=0; d<7; d++ ){
        var th = document.createElement('th');
        th.innerHTML = daysTitles[d][0] + '<span>' + daysTitles[d].slice( 1 ) + '</span>';
        tr.appendChild(th);
    }
    table.appendChild(tr);

    var i = 0;
    for ( var w=0; w<weeksCount; w++ ){
        var tr = document.createElement('tr');

        for ( var d=0; d<7; d++ ){
            i++;

            var td = document.createElement('td');
            var p = document.createElement('p');

            jQuery(p).addClass('number');
            
            if ( i <= firstDayOfMonth ){
                // p.innerHTML = daysInPreviousMonth + ( i - firstDayOfMonth );

                jQuery(tr).addClass('previous-month-day-tr');
                jQuery(td).addClass('previous-month-day');
            } else if ( i> ( firstDayOfMonth + daysInCurrentMonth ) ){
                // p.innerHTML = i - firstDayOfMonth - daysInCurrentMonth;

                jQuery(tr).addClass('next-month-day-tr');
                jQuery(td).addClass('next-month-day');
            } else {
                var date = i - firstDayOfMonth;
                p.innerHTML = date;

                jQuery(tr).addClass('current-month-day-tr');
                jQuery(td).addClass('current-month-day');

                var dkey = ( date>=10 ? date : '0' + date ) + '/' + ( month>=10 ? month : '0' + month ) + '/' + year;
                jQuery(td).attr( 'data-date', dkey );
            }

            if ( d > 4 ) jQuery(td).addClass('weekend-day');

            var currentD = new Date();

            if (
                i - firstDayOfMonth == currentD.getDate()
                && month == currentD.getMonth() + 1
                && year == currentD.getFullYear()
            ) jQuery(td).addClass('current-day');

            td.appendChild( p );
            tr.appendChild( td );
        }
        
        table.appendChild( tr );
    }

    inView.appendChild( table );

    jQuery(_calendar).html( view );

    setDatesInfo( _calendar );
}

function setDatesInfo( _calendar ){
    var dates = JSON.parse( jQuery( _calendar ).attr('data-dates') );

    var filterExam = jQuery('#calendar-filter-exam').val();
    var filterVersion = jQuery('#calendar-filter-version').val();
    var filterLevel = jQuery('#calendar-filter-level').val();

    jQuery('.registg_cont .event').remove();
    
    for ( var id in dates ){
        var datesJSON = dates[ id ];
        var td = jQuery('.registg_cont [data-date="' + id + '"]').get(0);

        if (
            datesJSON 
            && datesJSON.length
            && td
        ){
            var event = document.createElement('div');
            jQuery(event).addClass('event');

            var activeCount = 0;
            for ( var ie in datesJSON ){
                var dateJSON = datesJSON[ie];
                
                if (
                    dateJSON
                    && (
                        !filterExam
                        || filterExam == dateJSON.code
                    )
                    && (
                        !filterVersion
                        || filterVersion == dateJSON.version
                    )
                    && (
                        !filterLevel
                        || filterLevel == dateJSON.level_slug
                    )
                ){
                    if ( activeCount < 5 ){
                        var a = document.createElement('a');

                        jQuery(a).addClass( 'show-popup' );
                        jQuery(a).addClass( 'specific' );
                        jQuery(a).addClass( 'col_' + dateJSON.level_slug );
                        jQuery(a).addClass( dateJSON.version=='pdf' ? 'grey_1' : dateJSON.version=='paper' ? 'grey_2' : 'grey_0' );

                        jQuery(a).attr( 'data-popup', dateJSON.expired ? 'error' : 'popup_4' );
                        jQuery(a).attr( 'href', '#exam-' + dateJSON.slug );

                        jQuery(a).attr( 'data-date', JSON.stringify( dateJSON ) );
                        
                        jQuery(a).attr( 'title', dateJSON.category ? dateJSON.category.title : dateJSON.exam_title );

                        a.innerHTML = dateJSON.category ? dateJSON.category.code + ' (' + jQuery.trim( dateJSON.code ) + ')' : dateJSON.code;

                        event.appendChild( a );
                    }

                    activeCount++;
                }
            }

            if ( activeCount > 0 ){
                td.appendChild( event );
            
                var a = document.createElement('a');

                jQuery(a).attr( 'data-dates', JSON.stringify( datesJSON ) );

                jQuery(a).addClass( 'show-popup' );
                jQuery(a).addClass( 'all_bg' );

                jQuery(a).attr( 'data-popup', 'examen' );
                jQuery(a).attr( 'href', '#exams-date-' + id.split('/').join('-') );

                event.appendChild( a );

                if ( activeCount <= 5 ) jQuery(a).addClass( 'mobile-only' );
            }
        }
    }
}