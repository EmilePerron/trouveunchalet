<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230825134525 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE crawl_log (id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', site VARCHAR(255) NOT NULL, date_started DATETIME NOT NULL, date_completed DATETIME DEFAULT NULL, logs LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', total_listing_count INT DEFAULT NULL, crawled_count INT DEFAULT NULL, failed TINYINT(1) NOT NULL, date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE listing (id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', name VARCHAR(255) NOT NULL, address VARCHAR(512) NOT NULL, latitude NUMERIC(10, 7) DEFAULT NULL, longitude NUMERIC(10, 7) DEFAULT NULL, url VARCHAR(512) DEFAULT NULL, description LONGTEXT DEFAULT NULL, dogs_allowed TINYINT(1) DEFAULT NULL, parent_site VARCHAR(255) NOT NULL, image_url VARCHAR(512) DEFAULT NULL, internal_id VARCHAR(255) DEFAULT NULL, date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE unavailability (id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', date DATE NOT NULL, available_in_am TINYINT(1) NOT NULL, available_in_pm TINYINT(1) NOT NULL, listing_id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', INDEX IDX_F0016D1D4619D1A (listing_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE crawl_log');
        $this->addSql('DROP TABLE listing');
        $this->addSql('DROP TABLE unavailability');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
