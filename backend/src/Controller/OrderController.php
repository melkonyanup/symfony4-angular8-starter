<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Order Controller
 * @Route("/api/order", name="api_")
 */
class OrderController extends AbstractFOSRestController
{
    /**
     * @Rest\Get("/list", name="order_list")
     */
    public function list()
    {
        $entityManager = $this->getDoctrine()->getManager();
        $orders = $entityManager->getRepository(Order::class)->findAll();
        
        return [
            'success' => true,
            'message' => count($orders).' products found',
            'data' => $orders
        ];
    }
    
    /**
     * @Rest\Delete("/delete/{id}", name="order_delete")
     */
    public function delete(int $id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $order = $entityManager->getRepository(Order::class)->find($id);
        
        if (!$order) {
            return [
                'success' => false,
                'message' => 'No product found for id '.$id,
                'data' => ''
            ];
        }

        $entityManager->remove($order);
        $entityManager->flush();

        return [
            'success' => true,
            'message' => 'Product deleted for id '.$id,
            'data' => ''
        ];
    }
}
