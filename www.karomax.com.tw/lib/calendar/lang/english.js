    var scwLanguage = 'english';

	function scwSetLanguage()
		{switch (scwLanguage)
			{case 'english':
				//  Chinese Traditional
				scwToday               = 'Today:';
				scwDrag                = 'click here to drag';
				scwArrMonthNames       = ['Jan','Feb','Mar','Apr','May','Jun',
										  'Jul','Aug','Sep','Oct','Nov','Dec'];
				scwArrWeekInits        = ['S','M','T','W','T','F','S'];
				scwInvalidDateMsg      = 'The entered date is invalid.\n';
				scwOutOfRangeMsg       = 'The entered date is out of range.';
				scwDoesNotExistMsg     = 'The entered date does not exist.';
				scwInvalidAlert        = ['Invalid date (',') ignored.'];
				scwDateDisablingError  = ['Error ',' is not a Date object.'];
				scwRangeDisablingError = ['Error ',' should consist of two elements.'];
				break;

			 default:
				// English
				scwToday               = 'Today:';
				scwDrag                = 'click here to drag';
				scwArrMonthNames       = ['Jan','Feb','Mar','Apr','May','Jun',
										  'Jul','Aug','Sep','Oct','Nov','Dec'];
				scwArrWeekInits        = ['S','M','T','W','T','F','S'];
				scwInvalidDateMsg      = 'The entered date is invalid.\n';
				scwOutOfRangeMsg       = 'The entered date is out of range.';
				scwDoesNotExistMsg     = 'The entered date does not exist.';
				scwInvalidAlert        = ['Invalid date (',') ignored.'];
				scwDateDisablingError  = ['Error ',' is not a Date object.'];
				scwRangeDisablingError = ['Error ',' should consist of two elements.'];
			}
		}
