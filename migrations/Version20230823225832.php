<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230823225832 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE crawl_log DROP FOREIGN KEY FK_E9A67165F6BD1646');
        $this->addSql('ALTER TABLE listing DROP FOREIGN KEY FK_CB0048D484F56200');
        $this->addSql('CREATE TABLE unavailability (id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', listing_id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', date DATE NOT NULL, available_in_am TINYINT(1) NOT NULL, available_in_pm TINYINT(1) NOT NULL, INDEX IDX_F0016D1D4619D1A (listing_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE unavailability ADD CONSTRAINT FK_F0016D1D4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
        $this->addSql('DROP TABLE site');
        $this->addSql('DROP INDEX IDX_E9A67165F6BD1646 ON crawl_log');
        $this->addSql('ALTER TABLE crawl_log ADD site VARCHAR(255) NOT NULL, DROP site_id');
        $this->addSql('DROP INDEX IDX_CB0048D484F56200 ON listing');
        $this->addSql('ALTER TABLE listing ADD parent_site VARCHAR(255) NOT NULL, DROP parent_site_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE site (id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, url VARCHAR(512) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, crawler VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE unavailability DROP FOREIGN KEY FK_F0016D1D4619D1A');
        $this->addSql('DROP TABLE unavailability');
        $this->addSql('ALTER TABLE crawl_log ADD site_id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', DROP site');
        $this->addSql('ALTER TABLE crawl_log ADD CONSTRAINT FK_E9A67165F6BD1646 FOREIGN KEY (site_id) REFERENCES site (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_E9A67165F6BD1646 ON crawl_log (site_id)');
        $this->addSql('ALTER TABLE listing ADD parent_site_id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', DROP parent_site');
        $this->addSql('ALTER TABLE listing ADD CONSTRAINT FK_CB0048D484F56200 FOREIGN KEY (parent_site_id) REFERENCES site (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_CB0048D484F56200 ON listing (parent_site_id)');
    }
}
