<?php

namespace Webseite\HomeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Webseite\HomeBundle\Entity\Notification;
use Webseite\HomeBundle\Form\NotificationType;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('WebseiteHomeBundle:Default:index.html.twig');
    }
    
     public function aproposAction()
    {
        return $this->render('WebseiteHomeBundle:Default:apropos.html.twig');
    }

    public function notificationAction(Request $request)
    {
        $notification = new Notification();
        $form = $this->createForm(NotificationType::class, $notification);

        $form->handleRequest($request);

        if ($form->isValid()){
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $notification = $form->getData();

            $message = \Swift_Message::newInstance()
                ->setSubject( $notification->getObjet() )
                ->setFrom("fdlrstd@gmail.com")
                ->setTo('jongofidel@yahoo.fr')
                ->setCharset('utf-8')
                ->setContentType('text/html')
                ->setBody(
                    $this->renderView(
                        // app/Resources/views/Emails/registration.html.twig
                        'AppBundle:Default:index.html.twig', array('mlocal1' => $notification->getContenu())
                        // 'WebseiteHomeBundle:Default:apropos.html.twig'
                    )
                );
            $this->get('mailer')->send($message);

            return $this->redirectToRoute('webseite_home_homepage');
        }

    	return $this->render('WebseiteHomeBundle:Default:notify.html.twig', array(
                            'form' => $form->createView()));
    }
}
