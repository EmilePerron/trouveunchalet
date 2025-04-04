<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250404012839 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add indexes on listing latitude & longitude.';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_CB0048D44118D123 ON listing (latitude)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_CB0048D485E16F6B ON listing (longitude)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_CB0048D44118D123 ON listing
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_CB0048D485E16F6B ON listing
        SQL);
    }
}
