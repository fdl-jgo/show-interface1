<?php

namespace Webseite\HomeBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;


class Notification
{
    /**
     * @Assert\NotBlank()
     * @Assert\Length(max=100)
     */ 
    private $nom;
    /**
     * @Assert\NotBlank()
     * @Assert\Email()
     * @Assert\Length(max=100)
     */
    private $email;
    /**
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     */
    private $objet;
    /**
     * @Assert\NotBlank()
     */
    private $contenu;
    /**
     * @Assert\DateTime()
     * @Assert\Type("\DateTime")
     */
    private $datedenvoi;

    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    public function getNom()
    {
        return $this->nom;
    }

    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setObjet($objet)
    {
        $this->objet = $objet;

        return $this;
    }

    public function getObjet()
    {
        return $this->objet;
    }

    public function setContenu($contenu)
    {
        $this->contenu = $contenu;

        return $this;
    }

 
    public function getContenu()
    {
        return $this->contenu;
    }

    public function setDatedenvoi($datedenvoi)
    {
        $this->datedenvoi = $datedenvoi;

        return $this;
    }

    public function getDatedenvoi()
    {
        return $this->datedenvoi;
    }
}

