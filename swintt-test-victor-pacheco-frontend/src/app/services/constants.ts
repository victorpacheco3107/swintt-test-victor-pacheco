
export class Constants {
  public static SITE_NAME = `Test Victor Pacheco - Swintt`;

  public static TIME_TO_RESEND_CONFIRMATION_CODE = 60;
  public static START_TIME_TO_RESEND_CONFORMATION_CODE ='1:00';

  public static PRIMARY = 'primary';
  public static ERROR = 'error';
  public static WARNING = 'warning';

  public static EMAIL_PATTERN = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  public static PASSWORD_PATTERN = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\\W)|(?=.*_))^[^ ]+$';
  public static PASSWORD_MIN_LENGTH = 8;
  public static PATTERN_AT_LEAST_ONE_NUMBER = /\d/;
  public static PATTERN_AT_LEAST_ONE_UPPER = /[A-Z]/;
  public static PATTERN_AT_LEAST_ONE_LOWER = /[a-z]/;
  public static PATTERN_AT_LEAST_SPECIAL_CHARACTER = /[\^$*.[\]{}()?!"@#%&/\\,><':;|_~`+=-]/;
  public static PATTERN_NOT_START_OR_END_WITH_SPACE = /^(?![\s\S]*\s$)(?![\s\S]*^\s).*$/;

  public static API_NOTES_NAME = 'notes-api';

}
