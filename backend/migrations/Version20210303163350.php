<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210303163350 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE "order" (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date DATETIME NOT NULL, customer VARCHAR(50) NOT NULL, address1 VARCHAR(255) NOT NULL, city VARCHAR(50) NOT NULL, postcode VARCHAR(20) NOT NULL, country VARCHAR(50) NOT NULL, amount INTEGER NOT NULL, status VARCHAR(20) NOT NULL, deleted VARCHAR(20) NOT NULL, last_modified DATETIME NOT NULL)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE "order"');
    }
}
