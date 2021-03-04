<?php

namespace App\Command;

use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use pcrov\JsonReader\JsonReader;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

/**
 * Class ImportOrdersCommand
 * @package App\ConsoleCommand
 */
class ImportOrdersCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'json:import-orders';

    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * CsvImportCommand constructor.
     *
     * @param EntityManagerInterface $em
     *
     * @throws \Symfony\Component\Console\Exception\LogicException
     */
    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();

        $this->em = $em;
    }

    /**
     * Configure
     * @throws \Symfony\Component\Console\Exception\InvalidArgumentException
     */
    protected function configure()
    {
        $this
            // the short description shown while running "php bin/console list"
            ->setDescription('Import the orders.')
    
            // the full command description shown when running the command with
            // the "--help" option
            ->setHelp('This command allows you to import the orders...')
        ;
    }

    /**
     * @param InputInterface  $input
     * @param OutputInterface $output
     *
     * @return void
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);
        $io->title('Attempting import of Orders...');

        $reader = new JsonReader();
        $reader->open('%kernel.root_dir%/../data/orders.json');

        $reader->read();
        $results = $reader->value();
        
        $io->progressStart(count($results));

        foreach ($results as $row) {

            // create new order
            $order = (new Order())
                ->setDate(new \DateTime($row['date']))
                ->setCustomer($row['customer'])
                ->setAddress1($row['address1'])
                ->setCity($row['city'])
                ->setPostcode($row['postcode'])
                ->setCountry($row['country'])
                ->setAmount($row['amount'])
                ->setStatus($row['status'])
                ->setDeleted($row['deleted'])
                ->setLastModified(new \DateTime($row['last_modified'])
            );

            $this->em->persist($order);

            $io->progressAdvance();
        }

        $this->em->flush();

        $io->progressFinish();
        $io->success('Command exited cleanly!');
        
        $reader->close();
    }
}