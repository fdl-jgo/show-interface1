<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

class DefaultController extends Controller
{
    public function indexAction()
    {
    	// $request = $this->getRequest();
     //    $local1 = $request->getLocale();
     //    $local2 = $request;

        $message = \Swift_Message::newInstance()
        ->setSubject('Hello Email')
        ->setFrom('yossi@gmail.com')
        ->setTo('jongofidel@yahoo.fr')
        ->setCharset('utf-8')
        ->setContentType('text/html')
        ->setBody(
            $this->renderView(
                // app/Resources/views/Emails/registration.html.twig
                'AppBundle:Default:index.html.twig', array('mlocal1' => "local1", 'mlocal2' => "locacl2")
                // 'WebseiteHomeBundle:Default:apropos.html.twig'
            )
        );
        $this->get('mailer')->send($message);

        return $this->render('AppBundle:Default:index.html.twig', array('mlocal1' => "local1", 'mlocal2' => "locacl2"));
    }

    public function setLocaleAction(Request $request)
    {
    	$locale = $request->getLocale();

    	$url = $this->container->get('request')->headers->get('referer');
    	if(empty($url))
    	{
    		$url = $this->container->get('router')->headers->get('index');
    	} else {
			$str1 = array("/fr/", "/en/", "/nl/", "/de/");
			$str2   = array("/".$locale."/", "/".$locale."/", "/".$locale."/", "/".$locale."/");
			$url = str_replace($str1, $str2, $url);
    	}

        return $this->Redirect($url);
    }
}
