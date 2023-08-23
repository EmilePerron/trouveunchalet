<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230823004754 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE crawl_log (id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', site_id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', date_started DATETIME NOT NULL, date_completed DATETIME DEFAULT NULL, logs JSON NOT NULL, total_listing_count INT DEFAULT NULL, crawled_count INT DEFAULT NULL, failed TINYINT(1) NOT NULL, INDEX IDX_E9A67165F6BD1646 (site_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE crawl_log ADD CONSTRAINT FK_E9A67165F6BD1646 FOREIGN KEY (site_id) REFERENCES site (id)');
        $this->addSql('ALTER TABLE listing ADD internal_id VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE crawl_log DROP FOREIGN KEY FK_E9A67165F6BD1646');
        $this->addSql('DROP TABLE crawl_log');
        $this->addSql('ALTER TABLE listing DROP internal_id');
    }
}
