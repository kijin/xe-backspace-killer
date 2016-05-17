<?php

if (!defined('__XE__'))
{
	exit;
}

if($called_position == 'before_display_content' && Context::getResponseMethod() == 'HTML')
{
	Context::loadFile(array('./addons/backspace_killer/backspace_killer.js', 'body', '', null), true);
}
