<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231003231934 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add index on listing parent_site + internal_id';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE INDEX IDX_CB0048D454A03F50BFDFB4D8 ON listing (parent_site, internal_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP INDEX IDX_CB0048D454A03F50BFDFB4D8 ON listing');
    }
}
